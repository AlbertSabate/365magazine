export default function slugify(prefix?: string) {
  return (input: string) => {
    const formattedPrefix = prefix ? prefix.concat('/') : '';
    return formattedPrefix.concat(
      input
        .toLowerCase()
        .replace(/\s+/g, '-')
        .slice(0, 96),
    );
  };
}
