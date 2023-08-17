package groupd.DNDMapGen;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class MapController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/generateImage", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateImage (
            @RequestParam(name = "Map Size", defaultValue = "s") String mapSize,
            @RequestParam(name = "Map Theme", defaultValue = "g") String mapTheme)
            throws IOException{

        // Generate the image based on mapSize and mapTheme
        byte[] imageBytes = generateMap(mapSize, mapTheme);

        return ResponseEntity.ok().body(imageBytes);
    }

    public byte[] generateMap(String mapSize, String mapTheme) throws IOException{
        BufferedImage image = createPlaceholderImage(mapSize, mapTheme);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        return baos.toByteArray();
    }
    private BufferedImage createPlaceholderImage(String mapSize, String mapTheme) {
        int width = 200;
        int height = 200;

        if (mapSize.equals("m")) {
            width = 400;
            height = 400;
        } else if (mapSize.equals("l")) {
            width = 800;
            height = 800;
        }

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

        Graphics2D graphics = image.createGraphics();

        if (mapTheme.equals("n")) {
            graphics.setColor(Color.BLACK);
            graphics.fillRect(0, 0, width, height);
            graphics.setColor(Color.WHITE);
            graphics.drawString("Necromancer's Dungeon", width / 4, height / 2);
        }
        else if(mapTheme.equals("g")) {
            graphics.setColor(Color.GREEN);
            graphics.fillRect(0, 0, width, height);
            graphics.setColor(Color.BLACK);
            graphics.drawString("Graveyard", width / 3, height / 2);
        }
        return image;
    }
}
