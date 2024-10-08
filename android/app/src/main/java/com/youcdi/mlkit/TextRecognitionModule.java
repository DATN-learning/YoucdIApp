package com.youcdi.mlkit;
import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.io.IOException;

public class TextRecognitionModule extends  ReactContextBaseJavaModule {
    public TextRecognitionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "TextRecognitionModule";
    }

    public WritableMap getRectMap(Rect rect){
        WritableMap rectMap = Arguments.createMap();
        rectMap.putInt("left", rect.left);
        rectMap.putInt("top", rect.top);
        rectMap.putInt("width", rect.right - rect.left);
        rectMap.putInt("height", rect.bottom - rect.top);
        return rectMap;
    }

    @ReactMethod
    public void recognizeImage(String url, Promise promise) {
        Log.d("TextRecognitionModule", "Url: " + url);
        Uri uri = Uri.parse(url);
        InputImage image;
        try {
            image = InputImage.fromFilePath(
                    getReactApplicationContext(), uri);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
                    recognizer.process(image)
                            .addOnSuccessListener(new OnSuccessListener<Text>() {
                                @Override
                                public void onSuccess(Text result) {
                                    WritableMap response = Arguments.createMap();
                                    response.putString("width", image.getWidth() + "");
                                    response.putString("height", image.getHeight() + "");
                                    WritableArray blocks = Arguments.createArray();
                                    for (Text.TextBlock block : result.getTextBlocks()) {
                                        WritableMap blockObject = Arguments.createMap();
                                        blockObject.putString("text", block.getText());
                                        blockObject.putMap("rect", getRectMap(block.getBoundingBox()));
                                        WritableArray lines = Arguments.createArray();
                                        for (Text.Line line : block.getLines()) {
                                            WritableMap lineObject = Arguments.createMap();
                                            lineObject.putString("text", line.getText());
                                            lineObject.putMap("rect", getRectMap(line.getBoundingBox()));
                                            lines.pushMap(lineObject);
                                        }
                                        blockObject.putArray("lines", lines);
                                        blocks.pushMap(blockObject);
                                    }
                                    response.putArray("blocks", blocks);
                                    promise.resolve(response);
                                }
                            })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            promise.reject("TextRecognitionModule failed to", e.getMessage());
                                        }
                                    });

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
//    react native module hello world
     @ReactMethod
    public void helloWorld() {
        Log.d("TextRecognitionModule", "Hello World");
    }
}
