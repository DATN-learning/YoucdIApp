<PanGestureHandler onGestureEvent={panGestureEvent}>


const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
   onStart: (_, context) => {
     context.translationX = translateX.value;
     context.translationY = translateY.value;
   },
   onActive: (event, context) => {
     translateX.value = event.translationX + context.translationX;
     translateY.value = event.translationY + context.translationY;
     console.log(translateX.value);
   },
   onEnd: () => {
     if (Math.abs(translateX.value) > dimensions.width / 2 - videoWidth) {
       translateX.value = withSpring(-dimensions.width / 2 - (isHide ? videoPadingHide : videoPading));
       if (Math.abs(translateY.value) > dimensions.height / 2 - videoHeight) {
         translateY.value = withSpring(dimensions.height / 2 - (isHide ? -(videoHeight - menuHeight) : videoPading));
       } else {
         translateY.value = withSpring(0);
       }
     } else {
       translateX.value = withSpring(0);
       if (Math.abs(translateY.value) > dimensions.height / 2 - videoHeight) {
         translateY.value = withSpring(
           dimensions.height / 2 - (isHide ? -(videoHeight - menuHeight) : videoPadingHide),
         );
       } else {
         translateY.value = withSpring(0);
       }
     }
   },
 });
 const animatedStyle = useAnimatedStyle(() => {
   return {
     transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
     borderRadius: 10,
   };
 });

type ContextType = {
 startX: number;
 translationX: number;
 translationY: number;
};
