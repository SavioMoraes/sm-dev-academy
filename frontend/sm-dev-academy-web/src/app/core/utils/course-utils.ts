export function limitCourseText(
  title: string,
  description: string,
  maxTitleChars = 35,
  maxDescriptionChars = 100
): { title: string; description: string } {
  const cleanTitle = title.length > maxTitleChars ? title.slice(0, maxTitleChars) : title;
  const cleanDescription =
    description.length > maxDescriptionChars ? description.slice(0, maxDescriptionChars) : description;

  return {
    title: cleanTitle,
    description: cleanDescription,
  };
}