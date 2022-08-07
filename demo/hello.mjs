import {myIp} from "./demo.http";

let response = await myIp();

console.log(await response.json());
