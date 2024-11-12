import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei' // Hook pour charger les modèles GLTF
import * as THREE from 'three'  // Bibliothèque Three.js pour la manipulation 3D
import { useFrame } from '@react-three/fiber' // Hook permettant de mettre à jour la scène sur chaque frame

export function Model({ color = 'pink', ...props }) {
   // Chargement du modèle GLTF et de ses matériaux
    const { nodes, materials } = useGLTF('/iphone16.glb')
  

  // Définition des couleurs pour chaque variante
  const colors = {
    pink: '#F2ADDA',
    natural: '#B0D4D2',
    blue: '#9AADF6',
    white: '#FAFAFA',
    black: '#3C4042'
  }

  // Création d'une référence pour stocker le matériau principal de l'objet.
    // `useRef` est utilisé ici pour garder une référence mutable à l'objet matériau
    // sans provoquer de re-rendu de la scène à chaque modification.
  const mainMaterial = useRef(
    new THREE.MeshStandardMaterial({
        // La couleur du matériau est définie ici. La couleur est choisie à partir
    // de l'option passée en prop `color`, qui peut être 'pink', 'natural', etc.
    // `colors[color]` récupère la couleur correspondante à la clé `color`.
      color: new THREE.Color(colors[color]),
       // Le degré de **métallisme** du matériau, qui affecte la façon dont il interagit
        // avec la lumière et l'environnement. 0.7 signifie que le matériau est assez métallique.
      metalness: 0.7,
        // Le degré de **rugosité** du matériau, qui détermine si la surface est lisse ou rugueuse.
        // 0.3 signifie que la surface est relativement lisse mais avec un peu de texture
      roughness: 0.3,
    })
  )
    // `mainMaterial.current` fait référence au matériau créé et stocké dans `mainMaterial`.
    // À chaque frame, dans la boucle d'animation, nous allons ajuster la couleur de ce matériau
    // de manière fluide en utilisant `lerp` pour interpoler entre la couleur actuelle et la couleur cible.

  // Animation de la couleur du matériau sur chaque frame
  useFrame(() => {
    const targetColor = new THREE.Color(colors[color]) // Nouvelle couleur cible
    // Utilise `lerp` pour interpoler la couleur actuelle du matériau vers la couleur cible.
    // 0.05 détermine la vitesse de la transition (plus faible = transition plus lente).
    mainMaterial.current.color.lerp(targetColor, 0.05) // 0.05 contrôle la vitesse de transition // Interpolation entre la couleur actuelle et la cible (transition douce)
  })

  return (
    <group {...props} dispose={null}>
        {/* Rotation des groupes de maillages pour les aligner correctement */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Liste des différents meshes (maillages) du modèle 3D avec leurs géométries et matériaux */}
          
          {/* Les objets sont rendus avec leur géométrie respective et leurs matériaux définis */}
          <mesh
            // Cette propriété permet à l'objet de **projeter une ombre** sur d'autres objets dans la scène. si eclairéer
            castShadow
            // Cette propriété permet à l'objet de **recevoir des ombres** projetées par d'autres objets.
            receiveShadow
            // La géométrie de la mesh est définie ici. `nodes.Object_12.geometry` fait référence à une géométrie
            // provenant d'un modèle 3D (probablement chargé via GLTF), représentant la forme de l'objet.
            // Ce fichier GLTF contient une structure d'objets, et `nodes.Object_12.geometry` fait spécifiquement 
            // référence à la géométrie d'un objet particulier dans le modèle 3D (par exemple, une partie de l'iPhone).
            geometry={nodes.Object_12.geometry}
            // Ici, le matériau de l'objet est spécifié. `materials.d79c406d92ac2ea2b462` fait référence
            // à un matériau défini dans le modèle 3D chargé via GLTF. Ce matériau contient des propriétés visuelles
            // comme la couleur, la texture, la brillance, etc. Le nom du matériau (`d79c406d92ac2ea2b462`) est une 
            // clé unique qui correspond à une texture ou un matériau particulier dans le modèle.
            material={materials.d79c406d92ac2ea2b462}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials['8ed052ed6d3cd71ab5e3']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials['5155c9eac3acd76d34a9']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_18.geometry}
            material={materials['4130c6244c49c5d5712e']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials.a18b462c494e4fd29b4b}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_23.geometry}
            material={materials.dee5a626f928a5fa4c28}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_25.geometry}
            material={materials.e73cdd81f0248824c66f}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_27.geometry}
            material={materials['5d66e4713803a9e0ad46']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_29.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_31.geometry}
            material={materials['3a020e0705c66463c666']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_33.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_36.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_38.geometry}
            material={materials.e7fedd2cefc789ae4070}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_40.geometry}
            material={materials.cf3bfd3f874c6277f037}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_42.geometry}
            material={materials['483cd8d2505fcf4cc33c']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_44.geometry}
            material={materials['13fa87e9b9ea638526bb']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_46.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_48.geometry}
            material={materials['2df164b7997e629e4d7e']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_50.geometry}
            material={materials['103fc094f5cdada7aa57']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_52.geometry}
            material={materials['25fa7b29639901e1f310']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_54.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_57.geometry}
            material={materials['82823ff934002f16e6e0']}
            position={[0, 0, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_59.geometry}
            material={materials.b4ad12de1fcbdd61166e}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_62.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_65.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_67.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_70.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_72.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_74.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_77.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_80.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_82.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_84.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_86.geometry}
            material={mainMaterial.current}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_88.geometry}
            material={materials['50c2259ef1b62ea11389']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_90.geometry}
            material={materials['994433e619f1f1513042']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_92.geometry}
            material={materials['16d76ca3cbeebab956f0']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_94.geometry}
            material={materials['15e105904fe114289c62']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_96.geometry}
            material={materials.a86dab30a71ca989ac8c}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_98.geometry}
            material={materials.a86dab30a71ca989ac8c}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_100.geometry}
            material={materials.a86dab30a71ca989ac8c}
          />
        </group>
      </group>
    </group>
  )
}
// Préchargement du modèle GLTF pour améliorer la performance lors du rendu initial
useGLTF.preload('/iphone16.glb')