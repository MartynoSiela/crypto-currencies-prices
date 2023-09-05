function createUrl(baseUrl, queryParams) {
  const url = `${baseUrl}?${new URLSearchParams(queryParams).toString()}`;

  return url;
}

const queryService = {
  createUrl,
};

export default queryService;
