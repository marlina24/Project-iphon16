import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Environment } from '@react-three/drei'
import { Model } from './models/Model'
import { motion, AnimatePresence } from 'framer-motion'

// Définition des couleurs possibles pour la personnalisation de l'iPhone
const COLORS = {
  pink: '#F2ADDA',
  natural: '#B0D4D2',
  blue: '#9AADF6',
  white: '#FAFAFA',
  black: '#3C4042'
}

function App() {
  // États du composant pour gérer la rotation, le zoom, la couleur, et l'état du menu
  const [rotation, setRotation] = useState(2.4)  // Initialisation de la rotation du modèle à 2.4
  const [zoom, setZoom] = useState(0.2)  // Initialisation du zoom à 0.2
  const [color, setColor] = useState('pink')  // Initialisation de la couleur à 'natural'
  const [autoRotate, setAutoRotate] = useState(true)  // Initialisation de l'auto-rotation à false
  const [isMenuOpen, setIsMenuOpen] = useState(false)  // État pour ouvrir/fermer le menu
  const [menuPosition, setMenuPosition] = useState({ x: window.innerWidth - 400, y: 100 })  // Initialise la position du menu à 400px du bord droit et 100px du haut de la fenêtre.
  const [isDragging, setIsDragging] = useState(false)  // Indicateur de si l'utilisateur est en train de faire glisser le menu
  const menuRef = useRef(null)  // Référence pour le menu flottant
  const [isLoaded, setIsLoaded] = useState(false)  // Indicateur de si le modèle est chargé
  const dragStartRef = useRef({ x: 0, y: 0 })  // Référence pour la position initiale du glissement du menu

  // Fonction qui gère le début du glissement du menu
  const handleDragStart = (e) => {
    setIsDragging(true)  // On active le drag
    const touch = e.type === 'mousedown' ? e : e.touches[0]  // On détecte si c'est un clic ou un toucher
    dragStartRef.current = {  // On enregistre la position initiale du glissement
      x: touch.clientX - menuPosition.x,
      y: touch.clientY - menuPosition.y
    }
  }

  // Fonction qui gère le mouvement du glissement du menu
  const handleDrag = (e) => {  // Fonction qui gère le mouvement de glissement
    if (!isDragging) return  // Si le drag n'est pas actif, on arrête l'exécution de la fonction ici
    e.preventDefault()  // Empêche l'action par défaut liée à l'événement, comme le défilement de la page pendant le drag
    const touch = e.type === 'mousemove' ? e : e.touches[0]  // Si l'événement est 'mousemove', on utilise 'e'. Sinon, on prend la première touche (e.touches[0]) pour gérer le drag sur les appareils tactiles 
    setMenuPosition({  // Met à jour la position du menu en fonction des coordonnées du mouvement
      x: touch.clientX - dragStartRef.current.x,  // Calcule la position horizontale du menu en fonction du mouvement du curseur/toucher par rapport à la position initiale
      y: touch.clientY - dragStartRef.current.y   // Calcule la position verticale du menu de la même manière
    })
  }

  // Fonction qui arrête le glissement du menu
  const handleDragEnd = () => {
    setIsDragging(false)  // On désactive le drag
  }

// Hook useEffect qui gère les événements du drag pendant que le menu est ouvert
useEffect(() => {
  if (!isMenuOpen) return  // Si le menu n'est pas ouvert, on ne fait rien

  // On ajoute des écouteurs d'événements pour le mouvement et l'arrêt du glissement
  window.addEventListener('mousemove', handleDrag) // Ajoute un écouteur d'événement pour les mouvements de la souris
  window.addEventListener('mouseup', handleDragEnd) // Ajoute un écouteur d'événement pour la fin du drag (lorsque l'utilisateur relâche le bouton de la souris)
  window.addEventListener('touchmove', handleDrag) // Ajoute un écouteur d'événement pour le déplacement tactile (sur mobile ou tablette)
  window.addEventListener('touchend', handleDragEnd) // Ajoute un écouteur d'événement pour la fin du drag sur un appareil tactile (lorsque l'utilisateur relâche son doigt)

  // Nettoyage des écouteurs d'événements lorsque le composant se démonte ou que le menu se ferme
  return () => {
    // Retirer les écouteurs d'événements quand le menu se ferme ou que le composant est démonté
    window.removeEventListener('mousemove', handleDrag)
    window.removeEventListener('mouseup', handleDragEnd)
    window.removeEventListener('touchmove', handleDrag)
    window.removeEventListener('touchend', handleDragEnd)
  }
}, [isDragging, isMenuOpen])  // Le useEffect est exécuté lorsque l'état du menu ou du drag change

  // Hook useEffect pour signaler que le modèle est chargé
  useEffect(() => {
    setIsLoaded(true)  // On indique que le modèle est chargé après le premier rendu
  }, [])  // Ce hook est exécuté une seule fois au montage du composant

  return (
    <div className="h-screen w-full bg-white/90 overflow-hidden relative"> {/* Conteneur de l'application */}
    {/* Section Hero (centrée par défaut) avec animation */}
    <motion.div 
      className={`relative z-20 ${  // Animation conditionnelle du positionnement
        isMenuOpen 
          ? 'absolute top-8 left-8' 
          : 'w-full h-full flex flex-col items-center justify-center'
      }`}
      animate={{ 
        scale: isMenuOpen ? 0.7 : 1,  // L'échelle du texte change quand le menu est ouvert
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }} // Animation fluide
    >
      <motion.h1 
        className="text-7xl font-bold text-black tracking-tight mb-4" // Titre principal
        initial={{ scale: 0.8, opacity: 0 }} // Initialisation du titre avec animation
        animate={{ scale: 1, opacity: 1 }} // Le titre devient visible avec une échelle normale
      >
        iPhone 16
      </motion.h1>
      <motion.p 
        className="text-2xl text-black/90 font-medium mb-8"  // Description sous le titre
        initial={{ opacity: 0 }} // Initialisation de l'opacité
        animate={{ opacity: isMenuOpen ? 0 : 1 }} // L'opacité change en fonction de l'état du menu
        transition={{ duration: 0.3 }} // Durée de l'animation
      >
        Titanium. Plus fort que jamais.
      </motion.p>
      <motion.button 
        onClick={() => setIsMenuOpen(true)} // Action pour ouvrir le menu
        className="bg-black/10 backdrop-blur-lg px-8 py-3 rounded-full text-black hover:bg-black/20 transition"
        initial={{ opacity: 0 }} // Initialisation de l'opacité
        animate={{ opacity: isMenuOpen ? 0 : 1 }} // L'opacité du bouton change selon le menu
        whileHover={{ scale: 1.05 }}  // Animation de survol du bouton
      >
        Personnaliser votre iPhone
      </motion.button>
    </motion.div>
  
      {/* 3D Model */}
      <motion.div
        className="absolute inset-0 z-10" // Positionne le conteneur du modèle 3D en utilisant un positionnement absolu pour le placer sur toute la taille de la fenêtre. 'inset-0' le place sur tout le conteneur parent, et 'z-10' le place au-dessus des autres éléments avec un z-index de 10.
        initial={{ opacity: 0, y: 100, scale: 1 }}  // Initialisation des propriétés du modèle au début de l'animation : il commence invisible (opacity: 0), décalé vers le bas (y: 100) et à une échelle normale (scale: 1).
        animate={{  // Propriétés de l'animation lorsqu'elle commence. Le modèle devient visible et son échelle change en fonction de l'état du menu.
          opacity: 1,  // Le modèle devient visible (opacity passe à 1).
          y: 0,  // Le modèle se déplace vers sa position d'origine (y=0, c'est-à-dire au centre vertical).
          scale: isMenuOpen ? 1 : 1.3  // Si le menu est ouvert (isMenuOpen = true), le modèle revient à sa taille normale (scale: 1), sinon il reste légèrement zoomé (scale: 1.3).
        }}
        transition={{ 
          duration: 1,  // La durée totale de l'animation est de 1 seconde. Cela définit combien de temps l'animation prendra pour changer de son état initial à son état final.
          delay: 0.5,  // Il y a un délai de 0.5 seconde avant que l'animation du modèle ne commence. Cela permet à l'animation du titre de se terminer avant que le modèle apparaisse.
          y: { type: "spring", damping: 15 },  // L'animation de la position verticale (y) utilise un ressort (spring) pour un mouvement plus naturel. Le "damping: 15" détermine la douceur du rebond, où plus le "damping" est faible, plus le rebond est marqué.
          scale: { type: "spring", stiffness: 120, damping: 10 }  // L'animation de l'échelle (scale) utilise également un ressort (spring) pour un mouvement fluide. "stiffness" (raideur) contrôle la force du ressort (120 dans ce cas, une valeur assez rigide), et "damping" contrôle la vitesse à laquelle l'oscillation diminue après le rebond (damping: 10, ce qui permet une réduction rapide des oscillations).
        }}
      >
      <Canvas 
        shadows // Active les ombres dans la scène 3D
        camera={{ 
          position: [0, 0, 8], // Position de la caméra
          fov: 35 // Champ de vision de la caméra
        }}
      >
        <Suspense fallback={null}>  // Utilisation de Suspense pour charger le modèle 3D de manière asynchrone
        <directionalLight 
            intensity={0.2}  // Intensité de la lumière directionnelle
            position={[5, 5, 5]}   // Position de la lumière
            castShadow  // La lumière projette des ombres
          />
          <Stage 
            environment="city"  // Définir l'environnement de la scène
            intensity={0.5}  // Intensité de l'environnement
            adjustCamera={false}   // Ne pas ajuster la caméra
          >
            <group 
              rotation={[0, rotation, 0]} // Application de la rotation
              scale={[zoom, zoom, zoom]} // Application du zoom
              position={[0, -1.3, 0]}  // Position du modèle 3D
            >
              <Model color={color} /> {/* Rendu du modèle 3D avec la couleur choisie */}
            </group>
          </Stage>
          <Environment preset="city" /> {/* Environnement avec un preset de type "city" */}
        </Suspense>
        <OrbitControls 
          enablePan={false}  // Désactive le panoramique (déplacement de la caméra horizontalement et verticalement)
          minPolarAngle={Math.PI / 3}  // Limite l'angle de la caméra en termes de latitude. La valeur en radians correspond à 60°.
          maxPolarAngle={Math.PI / 1.5}  // Limite l'angle maximal de la caméra en termes de latitude. La valeur en radians correspond à 120°.
          minDistance={6}  // Détermine la distance minimale entre la caméra et le modèle 3D (l'utilisateur ne pourra pas zoomer plus près que cette distance)
          maxDistance={10}  // Détermine la distance maximale entre la caméra et le modèle 3D (l'utilisateur ne pourra pas zoomer plus loin que cette distance)
          autoRotate={autoRotate}  // Active ou désactive la rotation automatique de la scène en fonction de l'état "autoRotate"
          autoRotateSpeed={-1}  // Définit la vitesse de la rotation automatique. La valeur de 1 signifie une rotation modérée (positive ou négative)
          />
      </Canvas>
    </motion.div>
      {/* Menu Flottant */}
      <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          ref={menuRef} // Référence pour le menu flottant
          className="fixed z-30 cursor-move" // Positionnement fixe du menu flottant
          style={{
            left: `${menuPosition.x}px`, // Position horizontale du menu
            top: `${menuPosition.y}px` // Position verticale du menu
          }}
          initial={{ opacity: 0, x: 50 }} // Initialisation de l'opacité et de la position
          animate={{ opacity: 1, x: 0 }} // L'animation fait apparaître le menu et le déplace
          exit={{ opacity: 0, x: 50 }} // L'animation de sortie pour le menu
          transition={{ type: "spring", damping: 20 }} // Utilisation d'un ressort pour l'animation
        >
            <div 
              className="bg-black/10 backdrop-blur-xl rounded-2xl p-6 w-80 shadow-2xl border border-black/10"
              onMouseDown={handleDragStart}  // Permet de démarrer le glissement sur le menu
              onTouchStart={handleDragStart}  // Permet de démarrer le glissement sur mobile
            >
              {/* Barre de titre */}
              <div className="flex justify-between items-center mb-6 cursor-move">
                <h3 className="text-black font-medium">Personnalisation</h3>
                <button 
                  onClick={() => setIsMenuOpen(false)} // Permet de fermer le menu
                  className="text-black/60 hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>
  
              {/* Couleurs */}
              <div className="mb-8">
                <h4 className="text-black/80 text-sm mb-4">Finition</h4> {/* Section de choix de couleur */}
                <div className="grid grid-cols-5 gap-3">
                  {Object.entries(COLORS).map(([colorKey, colorValue]) => ( // Pour chaque couleur définie dans COLORS
                    <button
                      key={colorKey}
                      onClick={() => setColor(colorKey)} // Change la couleur du modèle
                      className="group relative"
                    >
                      <div 
                        className={`w-full pb-[100%] rounded-lg transition-transform duration-200 ${
                          color === colorKey 
                            ? 'ring-2 ring-black scale-110' // Si c'est la couleur sélectionnée, on ajoute un contour
                            : 'hover:scale-105'  // Sinon, on ajoute un effet de survol
                        }`}
                        style={{ backgroundColor: colorValue }} // Définition de la couleur de fond du bouton
                      />
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Contrôles */}
              <div className="space-y-6">  {/* Conteneur qui gère l'espacement entre les éléments à l'intérieur */}
                <div>  {/* Conteneur pour les contrôles de rotation */}
                  
                  {/* Titre et bouton pour activer/désactiver l'auto-rotation */}
                  <div className="flex justify-between text-black/80 text-sm mb-2">  {/* Conteneur pour le titre et le bouton, aligné horizontalement */}
                    <span>Rotation</span>  {/* Label pour le contrôle de rotation */}
                    <button 
                      className={`px-3 py-1 rounded-full text-xs transition ${  // Style du bouton avec des classes conditionnelles
                        autoRotate  // Si l'auto-rotation est activée
                          ? 'bg-black/20 text-black'  // Le bouton a un fond noir transparent et texte noir
                          : 'bg-black/10 hover:bg-black/20'  // Sinon, fond noir très transparent, avec un effet de survol
                      }`}
                      onClick={(e) => {  // Lorsque le bouton est cliqué
                        e.preventDefault()  // Empêche l'action par défaut du bouton
                        setAutoRotate(!autoRotate)  // Inverse l'état de l'auto-rotation (active ou désactive)
                      }}
                    >
                      Auto  {/* Texte du bouton */}
                    </button>
                  </div>
                  <input 
                    type="range"  // Un slider pour contrôler la rotation
                    min="0"  // Valeur minimale de la rotation (0 degrés)
                    max={Math.PI * 2}  // Valeur maximale de la rotation (2π radians, soit 360 degrés)
                    step="0.01"  // Le pas du slider (précision de la rotation)
                    value={rotation}  // Valeur actuelle de la rotation, récupérée depuis l'état
                    onChange={(e) => {  // Quand la valeur du slider change
                      e.preventDefault()  // Empêche l'action par défaut du champ
                      e.stopPropagation()  // Empêche la propagation de l'événement pour ne pas affecter d'autres éléments
                      setRotation(parseFloat(e.target.value))  // Met à jour l'état de la rotation avec la nouvelle valeur du slider
                    }}
                    onMouseDown={(e) => e.stopPropagation()}  // Empêche la propagation de l'événement au clic sur le slider
                    onTouchStart={(e) => e.stopPropagation()}  // Empêche la propagation de l'événement pour le touché
                    className="w-full"  // Le slider prend toute la largeur disponible
                  />
                </div>

                <div>  
                  <label className="text-black/80 text-sm block mb-2">Zoom</label>  {/* Label pour le contrôle de zoom */}
                  <input 
                    type="range"  // Un autre slider pour contrôler le zoom
                    min="0.2"  // Valeur minimale du zoom (zoom à 20%)
                    max="1.2"  // Valeur maximale du zoom (zoom à 120%)
                    step="0.1"  // Pas du slider (zoom par paliers de 0.1)
                    value={zoom}  // Valeur actuelle du zoom, récupérée depuis l'état
                    onChange={(e) => {  // Quand la valeur du slider change
                      e.preventDefault()  // Empêche l'action par défaut du champ
                      e.stopPropagation()  // Empêche la propagation de l'événement
                      setZoom(parseFloat(e.target.value))  // Met à jour l'état du zoom avec la nouvelle valeur du slider
                    }}
                    onMouseDown={(e) => e.stopPropagation()}  // Empêche la propagation de l'événement au clic sur le slider
                    onTouchStart={(e) => e.stopPropagation()}  // Empêche la propagation de l'événement pour le touché
                    className="w-full"  // Le slider prend toute la largeur disponible
                  />
                </div>
              </div>
  
              {/* Reset */}
              <button 
              className="w-full mt-6 py-2 rounded-lg bg-black/10 text-black/90 hover:bg-black/20 transition"  // Style du bouton de réinitialisation
              onClick={() => {  // Lorsqu'on clique sur le bouton
                setRotation(2.4)  // Réinitialise la rotation à la valeur initiale (2.4 radians)
                setZoom(0.2)  // Réinitialise le zoom à la valeur minimale (0.2)
                setAutoRotate(false)  // Désactive l'auto-rotation
              }}
            >
              Réinitialiser la vue  {/* Texte du bouton */}
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App