package groupd.DNDMapGen;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

// @Component
public class WebSocketEventListener {

    // @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // Check if it's a WebSocket session disconnect event
        if (headerAccessor.getSessionAttributes() != null) {
            int playerId = (int) headerAccessor.getSessionAttributes().get("playerId");

            // Perform actions when a player disconnects, e.g., send a message to the server
            System.out.println("Player " + playerId + " has disconnected.");

            // You can send a message or update game state here as needed
        }
    }

}
