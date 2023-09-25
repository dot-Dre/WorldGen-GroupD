package texturerendering;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class Texture {
    private final String name;
    private final String path;
    private BufferedImage image;
    private final int width;
    private final int height;

    public Texture(String name, String path, int width, int height) {
        this.name = name;
        this.path = path;
        this.width = width;
        this.height = height;

        try {
            this.image = ImageIO.read(new File(path));
        } catch (IOException e) {
            e.printStackTrace();
            this.image = null;
        }
    }

    public BufferedImage getImage() {
        return this.image;
    }

    public String getPath() {
        return path;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    @Override
    public String toString() {
        return "Texture{" + "Name: " + name + "path=" + path + ", width=" + width + ", height=" + height + '}';
    }
}
