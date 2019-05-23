//模型类
//带收藏状态的model
export default  function ProjectModel(item,isFavorite) {
    this.item = item;
    this.isFavorite = isFavorite;
}