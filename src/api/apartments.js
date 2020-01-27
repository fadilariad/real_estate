import Api from "./api";

class ApartmentsApi extends Api {
    getSaleValues(){
        return this.get('sale');
    }
    getTypeApartmentsValues(){
        return this.get('type');
    }
}


export default new ApartmentsApi('/apartments/');