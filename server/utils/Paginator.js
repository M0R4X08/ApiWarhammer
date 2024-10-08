class Paginator {
  constructor(model) {
    this.model = model;
  }
  async paginateData(page = 1, limit = 10) {
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    const offset = (parsedPage - 1) * parsedLimit;

    const totalData = await this.model.count();
    const totalPages = Math.ceil(totalData / parsedLimit);
    return {
      page: parsedPage,
      limit: parsedLimit,
      offset: offset,
      totalData: totalData,
      totalPages: totalPages,
    };
  }

  async count() {
    return await this.model.count();
  }
}
export default Paginator;
