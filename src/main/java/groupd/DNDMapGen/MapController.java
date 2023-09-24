package groupd.DNDMapGen;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Generator;
import groupd.DNDMapGen.Generator.MockRenderer;

import java.io.IOException;
import java.nio.file.Files;

@RestController
public class MapController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getMap", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getImage(@RequestParam(name = "param1") String param1,
            @RequestParam(name = "param2") String param2) throws IOException {
        // Use param1 and param2 in your logic to customize the response.

        // For example, you can use param1 to determine the image path dynamically.
        String mapTheme = param1;
        String mapSize = param2;
        
        MapTheme theme = null;
        MapSize size = null;

        if (mapTheme.equals("Graveyard")) {
            theme = MapTheme.GRAVEYARD;
        } else if (mapTheme.equals("Mansion")) {
            theme = MapTheme.MANSION;
        } else if (mapTheme.equals("Basement")) {
            theme = MapTheme.BASEMENT;
        }

        if (mapSize.equals("Small")) {
            size = MapSize.SMALL;
        } else if (mapSize.equals("Medium")) {
            size = MapSize.MEDIUM;
        } else if (mapSize.equals("Large")) {
            size = MapSize.LARGE;
        }

        Generator gen = new Generator(size, theme);
        Dungeon dungeon = gen.build();
        
        // byte[] imageBytes = Files.readAllBytes();
        return ResponseEntity.ok().body(MockRenderer.render(dungeon));
    }
}
