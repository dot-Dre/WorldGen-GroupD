package groupd.DNDMapGen;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import groupd.DNDMapGen.MapBuilder.DungeonBuilder;

import java.io.IOException;

@RestController
public class MapController {

    /*
     * End point 1 : This endpoint handles customized map generation requests
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getCustomMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getCustomMap(@RequestParam(name = "theme") String theme,
            @RequestParam(name = "size") String size, @RequestParam(name = "roomNumber") int roomNumber,
            @RequestParam(name = "seed") int seed, @RequestParam(name = "variance") double variance)
            throws IOException {
    
        // Construct dungeon according to parameters        
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

        String response = dungeonBuilder.constructResource();
        return ResponseEntity.ok().body(response);
    }

    /*
     * End point 1 : This endpoint handles random map generation requests
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getQuickMap", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getQuickMap(@RequestParam(name = "theme") String theme,
            @RequestParam(name = "size") String size, @RequestParam(name = "roomNumber") int roomNumber,
            @RequestParam(name = "seed") int seed, @RequestParam(name = "variance") double variance)
            throws IOException {
        
        // Construct dungeon according to parameters
        DungeonBuilder dungeonBuilder = new DungeonBuilder();
        dungeonBuilder.theme(theme);
        dungeonBuilder.size(size);
        dungeonBuilder.seed(seed);
        dungeonBuilder.variance(variance);

        String response = dungeonBuilder.constructResource();
        return ResponseEntity.ok().body(response);
    }

}
