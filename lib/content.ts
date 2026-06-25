export interface ContentItem {
  id: string
  section: string
  key: string
  value: string
  image_url: string
  description: string
  sort_order: number
}

export async function getContent(section?: string): Promise<Record<string, ContentItem[]> | ContentItem[]> {
  const url = section ? `/api/content?section=${section}` : '/api/content'
  const response = await fetch(url, { cache: 'no-store' })
  return response.json()
}

export function getContentValue(
  content: ContentItem[] | undefined,
  key: string,
  defaultValue: string = ''
): string {
  return content?.find((item) => item.key === key)?.value || defaultValue
}

export function getContentImage(
  content: ContentItem[] | undefined,
  key: string,
  defaultValue: string = ''
): string {
  return content?.find((item) => item.key === key)?.image_url || defaultValue
}
