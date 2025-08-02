export const testFile = (
  file_name = 'test_image.png',
  file_type = 'image/png',
  content = "hello there"
) =>  new File(
      [content],
      file_name,
      { type: file_type },
    );

export const makeUrl = (baseUrl, limit, offset) =>
      `${baseUrl}?limit=${limit}&offset=${offset}`;

export const paginatedResults = (allResults, rawUrl, endpoint) => {
  /**
   * Helper to paginate a list of items, using the limit/offset technique.
   * The url should have limit and offset query parameters, otherwise they
   * default to a limit of 6 and an offset of 0.
   */
  // url from parameters
    const url = new URL(rawUrl);
    const limit = parseInt(url.searchParams.get('limit') || '6', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const count = allResults.length

  // pictures to be returned
  const results = allResults.slice(offset, offset + limit);

  const next =
        offset + limit < count
          ? makeUrl(endpoint, limit, offset + limit)
          : null;
  
  const previous = offset > 0 ? makeUrl(endpoint, limit, Math.max(0, offset - limit)) : null;

  return {
      count,
      previous,
      next,
      results,
    }
}