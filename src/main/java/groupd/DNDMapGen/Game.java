package groupd.DNDMapGen;

import java.util.List;

public class Game {
    private int gameId;
    private List<Player> players;
    private String mapImage;

    // Constructors, getters, and setters
    public Game(int gameId, List<Player> players, String mapImage) {
        this.gameId = gameId;
        this.players = players;
        this.mapImage = mapImage;
    }
}
