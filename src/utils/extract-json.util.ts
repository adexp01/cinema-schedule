export function extractJSON (text: string): any[] {
  // This regex pattern looks for JSON structures
  const regex = /{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*}/g
  const results = []
  let match

  // Find all matches
  while ((match = regex.exec(text)) !== null) {
    try {
      // Attempt to parse each match as JSON
      const json = JSON.parse(match[0])
      results.push(json)
    } catch (e) {
      console.error('Invalid JSON found:', match[0])
    }
  }

  return results
}
