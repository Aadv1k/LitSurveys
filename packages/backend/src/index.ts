//import { PORT } from "./const";
//import server from "./server";

//server.listen(PORT, () => { console.log(`listening on http://localhost:${PORT}`); })

import UserService from "./services/UserService";
//import { UserType } from "../../common/types/user";


export enum UserType {
  surveyor = "surveyor",
  surveyee = "surveyee",
  any = "any"
}


(async () => {
  console.log(await  UserService.createUser({
    id: "123",
    username: "ligmaballs123",
    email: "killerrazerblade@gmail.com",
    password: "foo@123",
    type: UserType.surveyee
  }))
})();
