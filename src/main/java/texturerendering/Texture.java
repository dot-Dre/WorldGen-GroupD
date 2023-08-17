package texturerendering;

public class Texture {
    private final String name;
    private final String path;
    private final int width;
    private final int height;

    public Texture(String name, String path, int width, int height) {
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
        return "Texture{" + "Name: " + name + "path=" + path + ", width=" + width + ", height=" + height + '}';
    }

}
