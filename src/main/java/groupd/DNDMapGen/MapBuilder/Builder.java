package groupd.DNDMapGen.MapBuilder;

import org.springframework.http.ResponseEntity;

public interface Builder<T> {

    /*
     * This returns a response entity
     */
    public ResponseEntity<T> construct();

}
