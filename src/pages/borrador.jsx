import React, { useState, useEffect, useRef } from 'react';
import '../css/SmoothCyclicSlider.css'; // Nuevo archivo CSS

const items = [
  { id: 'A', content: 'Contenido de A' },
  { id: 'B', content: 'Contenido de B' },
  { id: 'C', content: 'Contenido de C' },
  { id: 'D', content: 'Contenido de D' },
  { id: 'E', content: 'Contenido de E' },
];

const visibleItemsCount = 3;
const transitionDuration = 500; // ms

const SmoothCyclicSlider = () => {
  // `currentStep` ahora representa el "paso" en la secuencia A-B-C, B-C-D, etc.
  // No el índice del primer elemento directamente.
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);

  // Calcula los índices de los ítems que se *espera* que estén visibles
  // Esta función es solo para referencia conceptual, no se usará directamente para renderizar
  // ya que renderizamos todo el 'slider-track' y lo movemos.
  const getExpectedVisibleIndices = (step) => {
    const indices = [];
    for (let i = 0; i < visibleItemsCount; i++) {
      indices.push((step + i) % items.length);
    }
    return indices;
  };

  // Esta función ahora se encarga de determinar qué ítems deben ser renderizados en el track
  // para permitir el desplazamiento continuo.
  // Necesitamos al menos `visibleItemsCount` ítems de "relleno" al final para que el bucle
  // hacia el inicio sea suave.
  const getRenderedItems = () => {
    const rendered = [...items]; // Todos los elementos originales
    // Añade los primeros 'visibleItemsCount' elementos al final para el bucle
    for (let i = 0; i < visibleItemsCount; i++) {
      rendered.push(items[i % items.length]);
    }
    return rendered;
  };

  const renderedItems = getRenderedItems(); // El array de ítems extendido para renderizar

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Efecto para manejar la transición y el "reset" al final/inicio del bucle
  useEffect(() => {
    if (!trackRef.current) return;

    // Si no estamos en transición (ej. al cargar el componente), deshabilitar la transición inicial
    if (!isTransitioning) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${currentStep * (100 / visibleItemsCount)}%)`;
      void trackRef.current.offsetWidth; // Forzar reflow
      trackRef.current.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
      return;
    }

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      // Si el currentStep ha avanzado más allá del límite de los items originales,
      // "teletransportamos" el slider de vuelta a una posición equivalente en el inicio.
      // Ejemplo: A B C (step 0) -> B C D (step 1) -> C D E (step 2) -> D E A (step 3) -> E A B (step 4)
      // Si currentStep es 5 (el tamaño de items.length), significa que estamos viendo los primeros items de nuevo
      if (currentStep >= items.length) {
        trackRef.current.style.transition = 'none'; // Deshabilitar transición para el salto
        setCurrentStep(currentStep % items.length); // Vuelve al índice equivalente en los items originales
        void trackRef.current.offsetWidth; // Forzar reflow
        trackRef.current.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`; // Habilitar transición de nuevo
      }
      // Si el currentStep ha retrocedido más allá del inicio (índices negativos)
      else if (currentStep < 0) {
        trackRef.current.style.transition = 'none'; // Deshabilitar transición para el salto
        setCurrentStep(items.length + currentStep); // Vuelve al final del array original
        void trackRef.current.offsetWidth; // Forzar reflow
        trackRef.current.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`; // Habilitar transición
      }
    };

    trackRef.current.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      if (trackRef.current) {
        trackRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentStep, isTransitioning, items.length]);

  // Autoplay del slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isTransitioning]);

  return (
    <div className="smooth-cyclic-slider-container">
      <div className="slider-wrapper">
        <div
          ref={trackRef}
          className="slider-track"
          style={{
            '--visible-items-count': visibleItemsCount,
            '--total-rendered-items': renderedItems.length,
            transform: `translateX(-${currentStep * (100 / visibleItemsCount)}%)`,
            transition: isTransitioning
              ? `transform ${transitionDuration / 1000}s ease-in-out`
              : 'none',
          }}
        >
          {renderedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="slider-item">
              <h3>{item.id}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="slider-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="slider-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default SmoothCyclicSlider;