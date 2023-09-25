package groupd.DNDMapGen;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;

@RestController
public class MapController {

    @CrossOrigin(origins = "http://localhost:3000") // Configure CORS to allow requests from localhost:3000 (our frontend)
    @GetMapping(value = "/getMap", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getImage() throws IOException {
        ClassPathResource imageResource = new ClassPathResource("images/danejuriss.png");
        byte[] imageBytes = Files.readAllBytes(imageResource.getFile().toPath());

        return ResponseEntity.ok().body(imageBytes);
    }
}
