import Api from "./api";

class UsersApi extends Api{
    userLogOut(){
        return this.delete('/log-out')
    }
    validateUser(id) {
      return   this.get(`/validate/${id}`)
    }
    userApartments(id){
        return this.get(`/${id}/apartments`)
    }
}

export default new UsersApi('/users');