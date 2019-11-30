
import _ from 'lodash';

/**
 * Create crud service
 * @param {CrudService} service
 */
export function createListStore(service) {
  return () => {
    const store = {
      loading: false,
      list: [],
      page: 1,
      count: 0,
      search: '',
      pageSize: 10,
      errorObj: null,
      pageSizeOptions: [
        { key: 2, text: 2, value: 2 },
        { key: 10, text: 10, value: 10 },
        { key: 15, text: 15, value: 15 },
        { key: 20, text: 20, value: 20 },
        { key: 25, text: 25, value: 25 },
        { key: 50, text: 50, value: 50 },
        { key: 100, text: 100, value: 100 }
      ],

      setPage(e, {activePage}) {
        this.page = activePage;
        this.loadPage();
      },

      _setSearch(e, {value}) {
        this.search = value;
        this.loadPage();
      },

      setPageSize(e, {value}) {
        this.pageSize = value;
        this.loadPage();
      },

      setError(error) {
        this.errorObj = error;
      },

      setList(data) {
        this.list = data.list;
        this.count = data.count;
        this.loading = false;
      },

      loadPage() {
        const search = (this.search.length > 1) ? this.search : '';
        this.getList(this.page, this.pageSize, search);
      },

      /**
       * Get all records
       * @param {*} pageNum
       * @param {*} pageSize
       * @param {*} search
       */
      async getList(pageNum, pageSize, search) {
        this.loading = true;
        try {
          const response = await service.getList(pageNum, pageSize, search);
          this.setList(response.data.data);
        } catch (error) {
          this.setError(error.data)
          this.loading = false;
        }
      }
    }

    store.setSearch = _.debounce(store._setSearch, 300);

    return store;
  };
}