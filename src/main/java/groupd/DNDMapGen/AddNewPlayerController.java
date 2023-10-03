package groupd.DNDMapGen;

import java.util.UUID;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class AddNewPlayerController {

  @MessageMapping("/joinGame")
  @SendTo("/topic/newPlayers")
  public AddNewPlayer addNewPlayer(NewPlayerMessage message, SimpMessageHeaderAccessor headerAccessor) {
    String newPlayerId = this.generateNewPlayerId();
    headerAccessor.getSessionAttributes().put("playerId", newPlayerId);
    return new AddNewPlayer(newPlayerId, message.name(), message.role(), "Alive");
  }

  private String generateNewPlayerId() {
    return UUID.randomUUID().toString();
  }
}
