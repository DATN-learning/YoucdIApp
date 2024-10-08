package com.youcdi.mlkit;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.mlkit.vision.common.InputImage;
import java.io.IOException;

public class LandmarkRecognitionModule extends ReactContextBaseJavaModule {
    private static final String TAG = "LandmarkRecognition";

    public LandmarkRecognitionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
        return "LandmarkRecognition";
    }

    @ReactMethod
    public void recognizeLandmarksFromFile(String imagePath, final Promise promise) {
        InputImage image;
        try {
            // Tạo InputImage từ đường dẫn tới tệp tin
            image = InputImage.fromFilePath(getReactApplicationContext(), Uri.parse(imagePath));
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("Error", e.getMessage());
            return;
        }

//        // Tạo detector để nhận diện địa danh
//        LandmarkRecognizer detector = LandmarkRecognition.getClient();
//
//        // Áp dụng detector lên InputImage
//        detector.process(image)
//                .addOnSuccessListener(new OnSuccessListener<List<Landmark>>() {
//                    @Override
//                    public void onSuccess(List<Landmark> landmarks) {
//                        WritableArray result = Arguments.createArray();
//
//                        // Lấy thông tin của các địa danh được nhận diện
//                        for (Landmark landmark : landmarks) {
//                            WritableMap landmarkMap = Arguments.createMap();
//
//                            landmarkMap.putString("name", landmark.getName());
//                            landmarkMap.putDouble("latitude", landmark.getLatLng().latitude);
//                            landmarkMap.putDouble("longitude", landmark.getLatLng().longitude);
//                            landmarkMap.putDouble("likelihood", landmark.getConfidence());
//
//                            result.pushMap(landmarkMap);
//                        }
//
//                        promise.resolve(result);
//                    }
//                })
//                .addOnFailureListener(new OnFailureListener() {
//                    @Override
//                    public void onFailure(@NonNull Exception e) {
//                        e.printStackTrace();
//                        promise.reject("Error", e.getMessage());
//                    }
//                });
    }

}
