import {RxStompConfig} from "@stomp/rx-stomp";
import {RxStompService} from "../services/rxstomp/rxstomp.service";

export const RXSTOMP_CONFIG: RxStompConfig = {
  brokerURL: 'wss://poseidon-project-5d359f2cb4bd.herokuapp.com/toto'

}

export function rxStompServiceFactory(): RxStompService {
  const rxStomp = new RxStompService();
  rxStomp.configure(RXSTOMP_CONFIG);
  rxStomp.activate();
  return rxStomp;
}
