package groupd.DNDMapGen;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameWebSocketHandler {

    @MessageMapping("/joinGame")
    @SendTo("/topic/game")
    public Game handleJoinGame(Player player) {
        // Implement logic for handling player joins and game updates
        // Update the game state, notify other players, etc.
        return null;
    }
}
