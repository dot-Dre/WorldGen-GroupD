package texturerendering;
import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Generator;
import groupd.DNDMapGen.Generator.Tile;
import groupd.DNDMapGen.MapSize;
import groupd.DNDMapGen.MapTheme;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;

public class TextureRenderer {

    private HashMap<String, Texture> textureMap;
    private Dungeon dungeon;
    public TextureRenderer() {
        this.textureMap = new HashMap<>();
        Generator generator = new Generator(MapSize.SMALL, MapTheme.MANSION);
        this.dungeon = generator.build();
        initializeTextures();
        renderTextures();
    }


    public void initializeTextures() {
        // Make sure textureMap is initialized
        if (textureMap == null) {
            textureMap = new HashMap<>();
        }

        // Initialize textureMap with the textures in the textures folder
        File path = new File("src/main/java/texturerendering/textures/dungen-set-1");
        File[] files = path.listFiles();
        assert files != null;
        for (File file : files) {
            String name = file.getName();
            String[] split = name.split("\\.");
            String key = split[0];
            Texture texture = new Texture(name, file.getPath(), 16, 16);
            textureMap.put(key, texture);
        }
        System.out.println(textureMap);
    }
    public void renderTextures() {
        Tile[][] tiles = dungeon.getTiles();
        int tileWidth = 16;
        int tileHeight = 16;

        // Create a BufferedImage to hold the textures
        BufferedImage image = new BufferedImage(dungeon.width() * tileWidth, dungeon.height() * tileHeight, BufferedImage.TYPE_INT_ARGB);

        for (int x = 0; x < dungeon.width(); x++) {
            for (int y = 0; y < dungeon.height(); y++) {
                Tile tile = tiles[x][y];
                Texture texture;

                // Assign the texture based on the tile type
                if (tile == Tile.EMPTY) {
                    texture = textureMap.get("wall_topinner");
                } else if (tile == Tile.FLOOR) {
                    texture = textureMap.get("floor_clean");
                } else if (tile == Tile.WALL) {
                    texture = textureMap.get("wall_top");
                } else {
                    continue;
                }

                //get the BufferedImage
                BufferedImage tileImage = texture.getImage();

                // Draw this texture onto the main image at position (x * tileWidth, y * tileHeight)
                image.getGraphics().drawImage(tileImage, x * tileWidth, y * tileHeight, null);
            }
        }

        // Save the image to disk
        try {
            ImageIO.write(image, "PNG", new File("outputMap.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
