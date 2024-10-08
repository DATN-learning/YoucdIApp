package com.youcdi.mlkit;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.nl.translate.Translation;
import com.google.mlkit.nl.translate.Translator;
import com.google.mlkit.nl.translate.TranslatorOptions;

public class TranslateLanguageModule extends ReactContextBaseJavaModule {
    public TranslateLanguageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "TranslateLanguageModule";
    }

    @ReactMethod
    public void hello(){
        Log.d("TranslateLanguageModule", "Hello");
    }

    @ReactMethod
    public void TranslateLanguage(
            String text,
            String sourceLanguage,
            String targetLanguage,
            Promise promise
    ){
        TranslatorOptions options =
                new TranslatorOptions.Builder()
                        .setSourceLanguage(sourceLanguage)
                        .setTargetLanguage(targetLanguage)
                        .build();
        final Translator translator = Translation.getClient(options);

        DownloadConditions conditions = new DownloadConditions.Builder()
                .requireWifi()
                .build();
        translator.downloadModelIfNeeded(conditions)
                .addOnSuccessListener(
                        new OnSuccessListener() {
                            @Override
                            public void onSuccess(Object o) {
                                Log.d("TranslateLanguageModule", "Downloaded");
                                translator.translate(text)
                                        .addOnSuccessListener(
                                                new OnSuccessListener() {
                                                    @Override
                                                    public void onSuccess(Object o) {
                                                        Log.d("TranslateLanguageModule", "Translated");
                                                        Log.d("TranslateLanguageModule", o.toString());
                                                        promise.resolve(o.toString());
//                                                        Toast.makeText(getReactApplicationContext(), o.toString(), Toast.LENGTH_LONG).show();
                                                    }
                                                })
                                        .addOnFailureListener(
                                                new OnFailureListener() {
                                                    @Override
                                                    public void onFailure(@NonNull Exception e) {
                                                        Log.d("TranslateLanguageModule", "Translation failed");
                                                    }});
                            }
                        }
                )
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                Log.d("TranslateLanguageModule", "Download failed");
                            }
                        }
                );

    }

}
