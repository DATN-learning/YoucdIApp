package com.test71.mlkit;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SmartReplyModule extends ReactContextBaseJavaModule {
   public SmartReplyModule(ReactApplicationContext reactContext) {
       super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "SmartReplyModule";
    }
    @ReactMethod
    public void hello(){
        Log.d("SmartReplyModule", "Hello");
    }

}
