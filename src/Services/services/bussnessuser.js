import GenericServices from "./GenericServices";
class BussnessServices extends GenericServices {
  constructor() {
    super();
  }
  addBussness = (data, config) => {
    return this.postconfig("Bussness", data, config);
  };
  getBussness = () => {
    return this.get("Bussness");
  };
  getSingleBussness = (id) => {
    return this.get("Bussness/"+id);
  };
  updateBussness = (id,data) => {
    return this.put("Bussness/"+id,data);
  };
  getService = () => {
    return this.get('service');
  };
}
let bussnessServices = new BussnessServices();
export default bussnessServices;
