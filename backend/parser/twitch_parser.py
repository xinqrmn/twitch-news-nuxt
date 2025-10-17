from typing import List, Dict, Optional
import cloudscraper
import bs4
import time
import random


def parse_twitch_streamers() -> List[Dict[str, str]]:
    scraper = cloudscraper.create_scraper(
        browser={
            'browser': 'chrome',
            'platform': 'windows',
            'mobile': False
        }
    )

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }

    streamers_list = []
    base_url = "https://twitchtracker.com/channels/ranking/russian"
    max_pages = 10

    for page_num in range(max_pages):
        try:
            time.sleep(random.uniform(2, 5))
            current_page = page_num + 1

            response = scraper.get(
                url=f"{base_url}?page={current_page}",
                headers=headers,
                timeout=30
            )

            if not response.ok:
                print(f"Ошибка {response.status_code} на странице {current_page}")
                continue

            soup = bs4.BeautifulSoup(response.text, "lxml")
            table_rows = soup.find_all("tr")

            if len(table_rows) <= 1:
                print(f"Нет данных на странице {current_page}")
                break

            process_streamers_data(table_rows[1:], streamers_list)

        except Exception as error:
            print(f"Ошибка на странице {current_page}: {error}")
            continue

    return streamers_list


def process_streamers_data(streamers_rows: List[bs4.element.Tag],
                           output_list: List[Dict[str, str]]) -> None:
    for index, row in enumerate(streamers_rows):
        streamer_data = row.text.split()

        if len(streamer_data) >= 10:
            streamer_info = extract_streamer_info(row, streamer_data)
            if streamer_info:
                output_list.append(streamer_info)

def clear_streamer_input(text: str) -> str:
    if text in ["--", "", "null", "None"]:
            text = "0"
    return text

def extract_streamer_info(row: bs4.element.Tag,
                          streamer_data: List[str]) -> Optional[Dict[str, str]]:
    try:
        logo_parser = bs4.BeautifulSoup(str(row), "lxml")
        img_tag = logo_parser.find("img")

        if not img_tag:
            return None

        return {
            "logo": str(img_tag.get("src", "")),
            "displayName": str(streamer_data[1]),
            "avgViewers": str(clear_streamer_input(streamer_data[2])),
            "timeStreamed": str(streamer_data[3].replace('hours', '')),
            "allTimePeakViewers": str(clear_streamer_input(streamer_data[4])),
            "hoursWatched": str(clear_streamer_input(streamer_data[5])),
            "followersGained": str(clear_streamer_input(streamer_data[7])),
            "totalFollowers": str(clear_streamer_input(streamer_data[8])),
            "totalViews": str(clear_streamer_input(streamer_data[9])),
        }

    except Exception as error:
        print(f"Ошибка при парсинге логотипа: {error}")
        return None
