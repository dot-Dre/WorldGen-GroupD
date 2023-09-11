package groupd.com.DNDMapGen;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

public class MapDataHandler extends TextWebSocketHandler {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // Extract the parameters from the incoming message
        String payload = message.getPayload();
        Map params = parseParameters(payload);

        // Generate map data based on the parameters
        assert params != null;
        String mapData = generateMapData(params);
        System.out.println("\n Map data: " + mapData);


        // Serialize the payload object to JSON string
        String jsonString = serializeToJson(mapData);

        // Send the map data back to the client
        assert jsonString != null;
        session.sendMessage(new TextMessage(jsonString));
    }

    private Map parseParameters(String payload) {
        try {
            return objectMapper.readValue(payload, Map.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private String generateMapData(Map<String, String> params) throws IOException {
        String mapTheme = params.get("theme");
        String mapSize = params.get("size");
        // Generate the map data based on params
        BufferedImage image = createPlaceholderImage(mapSize, mapTheme);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    private  BufferedImage createPlaceholderImage(String mapSize, String mapTheme) {
        int width = 200, height = 200;

        if ("m".equals(mapSize)) {
            width = height = 400;
        } else if ("l".equals(mapSize)) {
            width = height = 800;
        }

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = image.createGraphics();

        if ("n".equals(mapTheme)) {
            drawNecromancerDungeon(graphics, width, height);
        } else if ("g".equals(mapTheme)) {
            drawGraveyard(graphics, width, height);
        }

        return image;
    }

    private  void drawNecromancerDungeon(Graphics2D graphics, int width, int height) {
        graphics.setColor(Color.BLACK);
        graphics.fillRect(0, 0, width, height);
        graphics.setColor(Color.WHITE);
        graphics.drawString("Necromancer's Dungeon", width / 4, height / 2);
    }

    private  void drawGraveyard(Graphics2D graphics, int width, int height) {
        graphics.setColor(Color.GREEN);
        graphics.fillRect(0, 0, width, height);
        graphics.setColor(Color.BLACK);
        graphics.drawString("Graveyard", width / 3, height / 2);
    }
    private String serializeToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
    @MessageExceptionHandler
    public String handleException(Throwable exception) {
        return "An error occurred: " + exception.getMessage();
    }
}