/**
 * Create relation store
 * @param {CrudStore} store
 * @param {string} url
 * @param {string} listReference
 */
export function createRelationStore(store, url, fieldName) {
  return () => ({
    selected: null,
    handleSelectionChange(relatedEntity) {
      this.selected = relatedEntity;
    },
    async delete(relatedEntity) {
      await store.removeRelation(relatedEntity, url, fieldName);
    },
    async add() {
      if (this.selected) {
        if (store.entity[fieldName].find((relatedEntity) => relatedEntity._id === this.selected._id)) {
          store.setError('The item is already in the list');
        } else {
          await store.addRelation(this.selected, url, fieldName);
        }
      }
    }
  });
}