package com.youcdi.mlkit;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;

import java.io.IOException;

public class LabelImagesModule extends ReactContextBaseJavaModule {
    private static final String TAG = "LabelImagesModule";
    public LabelImagesModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return TAG;
    }
    @ReactMethod
    public void labelImage(String imagePath, final Promise promise) {
        Log.d("labelImageURL", "Url: " + imagePath);
        Uri uri = Uri.parse(imagePath);
        try {
            InputImage image = InputImage.fromFilePath(getReactApplicationContext(), uri);
            ImageLabelerOptions options = new ImageLabelerOptions.Builder()
                    .setConfidenceThreshold(0.5f)
                    .build();
           ImageLabeler labeler = ImageLabeling.getClient(options);
            labeler.process(image)
                    .addOnSuccessListener(labels -> {
                        String labelString = "";
                        for (ImageLabel label : labels) {
                            String text = label.getText();
                            float confidence = label.getConfidence();
                            labelString += text + ": " + confidence + "\n";
                            Log.d(TAG, "labelImage AAAA: " + text + ": " + confidence);
                        }
                        promise.resolve(labelString);
                    })
                    .addOnFailureListener(e -> promise.reject(e));
        } catch (IOException e) {
            Log.e(TAG, "labelImage: ", e);
            promise.reject(e);
        }
    }


}
