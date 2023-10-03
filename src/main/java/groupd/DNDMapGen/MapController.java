package groupd.DNDMapGen;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import groupd.DNDMapGen.MapBuilder.Builder;
import groupd.DNDMapGen.MapBuilder.DungeonBuilder;

import java.io.IOException;
import java.nio.file.Files;

@RestController
public class MapController {

    /*
     * End point 1 : This endpoint handles map generation requests
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getCustomMap", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getCustomMap(@RequestParam(name = "theme") String theme,
            @RequestParam(name = "size") String size, @RequestParam(name = "roomNumber") int roomNumber,
            @RequestParam(name = "seed") int seed, @RequestParam(name = "variance") double variance)
            throws IOException {

        DungeonBuilder dungeonBuilder = new DungeonBuilder();

        dungeonBuilder.theme(theme);

        if (size != null) {
            dungeonBuilder.size(size);
        }

        if (roomNumber != -1) {
            dungeonBuilder.roomNumber(roomNumber);
        }

        dungeonBuilder.seed(seed);

        dungeonBuilder.variance(variance);

        return dungeonBuilder.construct();
    }

    /*
     * End point 1 : This endpoint handles map generation requests
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getQuickMap", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQuickMap(@RequestParam(name = "theme") String theme,
            @RequestParam(name = "size") String size, @RequestParam(name = "roomNumber") int roomNumber,
            @RequestParam(name = "seed") int seed, @RequestParam(name = "variance") double variance)
            throws IOException {

        DungeonBuilder dungeonBuilder = new DungeonBuilder();

        dungeonBuilder.theme(theme);
        
        if (size != null) {
            dungeonBuilder.size(size);
        }

        dungeonBuilder.seed(seed);

        dungeonBuilder.variance(variance);

        return dungeonBuilder.construct();
    }
}
