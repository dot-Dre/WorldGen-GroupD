package groupd.DNDMapGen;

public class NewPlayerMessage {

  private String name;

  public NewPlayerMessage() {
  }

  public NewPlayerMessage(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
