package groupd.DNDMapGen;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

// @Controller
public class UpdatePlayersController {

//   @MessageMapping("/hello")
//   @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message, SimpMessageHeaderAccessor headerAccessor) throws Exception {
    headerAccessor.getSessionAttributes().put("playerId", ""); // FIXME
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }
}
