package groupd.DNDMapGen.MapBuilder;

/**
 * A class which represents a reponse object in reponse to a request from the 
 * front end.
 * 
 * @author Andre Lepardo
 */
public class ResourceContent {

    /**
     * A byte array representing the image of the generated map
     */
    private byte[] imageResource = new byte[0];

    /**
     * A string object representing generated map data
     */
    private String jsonData = ""; 

    /**
     * Private constructor
     */
    public ResourceContent(byte[] image, String jsonDataString){
        this.imageResource = image;
        this.jsonData = jsonDataString;
    }

    /**
     * Set image data
     * 
     * @param image
     */
    public void setImageResource(byte[] image) {
        this.imageResource = image;
    }

    /**
     * Set json data
     * 
     * @param data
     */
    public void setjsonData(String data) {
        this.jsonData = data;
    }

    /**
     * Getter for imageResource
     * 
     * @return imageResource
     */
    public byte[] getImageResource() {
        return this.imageResource;
    }

    /**
     * Getter for json string
     * 
     * @return jsonString
     */
    public String getJsonString() {
        return this.jsonData;
    }
    
}
