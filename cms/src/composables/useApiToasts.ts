import { onMounted, onUnmounted } from 'vue'
import { useToast } from 'primevue'

export function useApiToasts() {
  const toast = useToast()

  const handleApiError = (event: CustomEvent) => {
    const status = event.detail.status
    let message = event.detail.message
    
    if (status === 400) message = "Проверьте введенные данные!"

    toast.add({
      severity: 'error',
      summary: 'Ошибка!',
      detail: message,
      life: 3000,
    })
  }

  onMounted(() => {
    window.addEventListener('api-error', handleApiError as EventListener)
  })
  onUnmounted(() => {
    window.removeEventListener('api-error', handleApiError as EventListener)
  })
}
