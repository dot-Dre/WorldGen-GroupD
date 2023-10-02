package groupd.DNDMapGen;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameController {
    private int gameIdLength = 9;
    private ConcurrentHashMap<Integer, Game> games = new ConcurrentHashMap<>();

    @PostMapping("/startGame")
    public ResponseEntity<Integer> startGame() {
        int gameId = generateGameId();
        // Prevent duplicate key overriding existing game (extremely unlikely to happen in the first place)
        while (this.games.containsKey(gameId)) {
            gameId = generateGameId();
        }
        Game game = new Game(gameId, new ArrayList<>(), "map_image_path");
        games.put(gameId, game);
        return ResponseEntity.ok(gameId);
    }

    /**
     * Generate a random, new game ID of length gameIdLength 
     * 
     * @return A new game ID
     */
    private int generateGameId() {
        Random random = new Random();
        String newGameToken = "";
        for (int i = 0; i < this.gameIdLength; i++) {
            newGameToken += random.nextInt(10);
        }
        return Integer.parseInt(newGameToken);
    }

    @GetMapping("/checkGame/{gameId}")
    public ResponseEntity<Boolean> checkGameId(@PathVariable Integer gameId) { // TODO make sure to make user only able to enter number in game id and no letters or other characters
        boolean gameExists = games.containsKey(gameId);
        return ResponseEntity.ok(gameExists);
    }

    // Implement other endpoints for managing games, adding players, etc.
}
