
  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;

  async function startHarmonyRecording() {

    try {

      console.log("🎙️ Solicitando micrófono...");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true
        });

      console.log("🎙️ Micrófono permitido");

      audioChunks = [];

      mediaRecorder =
        new MediaRecorder(stream);


      // =========================
      // AUDIO CAPTURADO
      // =========================

      mediaRecorder.ondataavailable = (event) => {

        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }

      };


      // =========================
      // EMPEZAR A ESCUCHAR
      // =========================

      mediaRecorder.onstart = () => {

        isRecording = true;

        console.log(
          "🔴 Harmony escuchando..."
        );

        const button =
          document.getElementById(
            "open-harmony"
          );

        button?.classList.add(
          "ring-4",
          "ring-blue-300",
          "animate-pulse"
        );

      };


      // =========================
      // TERMINAR GRABACIÓN
      // =========================

      mediaRecorder.onstop = async () => {

        isRecording = false;

        console.log(
          "🛑 Grabación terminada"
        );


        // Crear audio
        const audioBlob =
          new Blob(
            audioChunks,
            {
              type: "audio/webm"
            }
          );


        console.log(
          "🎧 Audio generado:",
          audioBlob.size,
          "bytes"
        );


        const button =
          document.getElementById(
            "open-harmony"
          );


        button?.classList.remove(
          "ring-4",
          "ring-blue-300",
          "animate-pulse"
        );


        // Detener micrófono
        stream
          .getTracks()
          .forEach(
            (track) =>
              track.stop()
          );


        // =========================
        // ENVIAR AUDIO
        // =========================

        const formData =
          new FormData();


        formData.append(
          "audio",
          audioBlob,
          "harmony.webm"
        );


        console.log(
          "📤 Enviando audio a Harmony..."
        );


        const response =
          await fetch(
            "/api/harmony/voice",
            {
              method: "POST",
              body: formData
            }
          );


        // =========================
        // ERROR
        // =========================

        if (!response.ok) {

          console.error(
            "❌ Error Harmony:",
            await response.text()
          );

          return;

        }


        // =========================
        // RECIBIR AUDIO DE HARMONY
        // =========================

        console.log(
          "🔊 Recibiendo respuesta de Harmony..."
        );


        const responseAudioBlob =
          await response.blob();


        console.log(
          "🎧 Audio recibido:",
          responseAudioBlob.size,
          "bytes"
        );


        // =========================
        // CREAR AUDIO
        // =========================

        const audioUrl =
          URL.createObjectURL(
            responseAudioBlob
          );


        const audio = new Audio(audioUrl);
        audio.playbackRate = 2.25;

        // =========================
        // HARMONY HABLANDO
        // =========================

        button?.classList.add(
          "ring-4",
          "ring-purple-400",
          "animate-pulse"
        );


        console.log(
          "🔊 Harmony hablando..."
        );


        await audio.play();


        // =========================
        // TERMINÓ DE HABLAR
        // =========================

        audio.onended = () => {
          console.log(
            "🔊 Harmony terminó de hablar"
          );


          button?.classList.remove(
            "ring-4",
            "ring-purple-400",
            "animate-pulse"
          );


          URL.revokeObjectURL(
            audioUrl
          );
          // 🔄 Recargar Kanban
          window.location.reload();
        };

      };


      // =========================
      // EMPEZAR GRABACIÓN
      // =========================

      mediaRecorder.start();

    } catch (error) {

      console.error(
        "❌ Error accediendo al micrófono:",
        error
      );

    }

  }


  function stopHarmonyRecording() {

    if (
      mediaRecorder &&
      mediaRecorder.state === "recording"
    ) {

      mediaRecorder.stop();

    }

  }


  // =========================
  // BOTÓN HARMONY
  // =========================

  document.addEventListener(
    "astro:page-load",
    () => {

      const button =
        document.getElementById(
          "open-harmony"
        );


      if (!button) {

        console.warn(
          "No existe #open-harmony"
        );

        return;

      }


      button.addEventListener(
        "click",
        async () => {

          console.log(
            "🤖 Harmony presionado"
          );


          if (!isRecording) {

            await startHarmonyRecording();

          } else {

            stopHarmonyRecording();

          }

        }
      );

    }
  );

