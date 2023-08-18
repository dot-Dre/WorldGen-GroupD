package texturerendering;

import java.awt.image.BufferedImage;

public class Prop {
private final String name;
    private final String path;

    private BufferedImage image;
    private final int width;
    private final int height;

    public Prop(String name, String path, int width, int height) {
        this.name = name;
        this.path = path;
        this.width = width;
        this.height = height;
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
        return "Prop{" + "Name: " + name + "path=" + path + ", width=" + width + ", height=" + height + '}';
    }
}
