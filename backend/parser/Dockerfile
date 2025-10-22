FROM python:3.14-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 6969

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:6969", "--timeout", "120", "--workers", "2"]
# CMD ["python", "app.py"]