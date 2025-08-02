export const testFile = (
  file_name = 'test_image.png',
  file_type = 'image/png',
  content = "hello there"
) =>  new File(
      [content],
      file_name,
      { type: file_type },
    );

const makeUrl = (baseUrl, limit, offset) =>
      `${baseUrl}?limit=${limit}&offset=${offset}`;

export const paginatedResults = ({allData, requestURL, endpoint, defaultLimit = 6}) => {
  /**
   * Helper to paginate a list of items, using the limit/offset technique.
   * The url should have limit and offset query parameters, otherwise they
   * default to a limit of 6 and an offset of 0.
   */
  // url from parameters
    const url = new URL(requestURL);
    const limit = parseInt(url.searchParams.get('limit') || `${defaultLimit}`, 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const count = allData.length

  // pictures to be returned
  const results = allData.slice(offset, offset + limit);

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