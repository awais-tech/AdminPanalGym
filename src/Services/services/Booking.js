import GenericServices from './GenericServices';
class BookingServices extends GenericServices {
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getBooking = () => {
    return this.get('booking');
  };
  getAdminBooking = () => {
    return this.get('booking/AdminBookings/all');
  };

 deleteAdminBooking = (id) => {
    return this.delete('booking/AdminDelete/'+id);
  };
  

  // deleteProduct = (_id) => {
  //   return this.delete("products/" + _id);
  // };
  // updateProduct = (_id, data) => {
  //   return this.put("products/" + _id, data);
  // };
  // getSingle = (_id) => {
  //   return this.get("products/" + _id);
  // };
}
let booking = new BookingServices();
export default booking;
