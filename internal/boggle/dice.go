package boggle

import (
	"errors"
	"fmt"
	"math/rand"
)

// Map of faces of platonic solids to sides of face shape
var facesToSides = map[int]int{
	4:  3, // e.g., tetrahedron: triangle
	6:  4,
	8:  3,
	12: 5,
	20: 3,
}

type DiceSet struct {
	Language string
	GameType string
	Dice     []Die // Should this be a pointer?
}

func (ds *DiceSet) Roll() error {
	for i, d := range ds.Dice {
		err := d.Roll()
		if err != nil {
			return err
		}
		ds.Dice[i] = d
	}
	return nil
}

func (ds *DiceSet) String() string {
	strRep := fmt.Sprintf("Language: %s\nGameType: %s\n", ds.Language, ds.GameType)
	for _, d := range ds.Dice {
		strRep += d.String()
	}
	return strRep
}

type Die struct {
	Orientation int
	Faces       []string
	CurrentIdx  int
}

func (d *Die) String() string {
	return fmt.Sprintf("%s at %d\u00B0\n", d.Faces[d.CurrentIdx], d.Orientation)
}

func (d *Die) Roll() error {
	numFaces := len(d.Faces)
	numOrientations, valid := facesToSides[numFaces]
	if !valid {
		return errors.New("invalid number of faces")
	}
	d.CurrentIdx = rand.Intn(numFaces)
	d.Orientation = rand.Intn(numOrientations) * 360 / numOrientations
	return nil
}

// EN Sets from: https://www.bananagrammer.com/2013/10/the-boggle-cube-redesign-and-its-effect.html
var ENClassicDiceSet = DiceSet{
	Language: "EN",
	GameType: "Classic",
	Dice: []Die{
		{Faces: []string{"A", "A", "C", "I", "O", "T"}},
		{Faces: []string{"A", "B", "I", "L", "T", "Y"}},
		{Faces: []string{"A", "B", "J", "M", "O", "Qu"}},
		{Faces: []string{"A", "C", "D", "E", "M", "P"}},
		{Faces: []string{"A", "C", "E", "L", "R", "S"}},
		{Faces: []string{"A", "D", "E", "N", "V", "Z"}},
		{Faces: []string{"A", "H", "M", "O", "R", "S"}},
		{Faces: []string{"B", "I", "F", "O", "R", "X"}},
		{Faces: []string{"D", "E", "N", "O", "S", "W"}},
		{Faces: []string{"D", "K", "N", "O", "T", "U"}},
		{Faces: []string{"E", "E", "F", "H", "I", "Y"}},
		{Faces: []string{"E", "G", "K", "L", "U", "Y"}},
		{Faces: []string{"E", "G", "I", "N", "T", "V"}},
		{Faces: []string{"E", "H", "I", "N", "P", "S"}},
		{Faces: []string{"E", "L", "P", "S", "T", "U"}},
		{Faces: []string{"G", "I", "L", "R", "U", "W"}},
	},
}

var ENModernDiceSet = DiceSet{
	Language: "EN",
	GameType: "Modern",
	Dice: []Die{
		{Faces: []string{"A", "A", "E", "E", "G", "N"}},
		{Faces: []string{"A", "B", "B", "J", "O", "O"}},
		{Faces: []string{"A", "C", "H", "O", "P", "S"}},
		{Faces: []string{"A", "F", "F", "K", "P", "S"}},
		{Faces: []string{"A", "O", "O", "T", "T", "W"}},
		{Faces: []string{"C", "I", "M", "O", "T", "U"}},
		{Faces: []string{"D", "E", "I", "L", "R", "X"}},
		{Faces: []string{"D", "E", "L", "R", "V", "Y"}},
		{Faces: []string{"D", "I", "S", "T", "T", "Y"}},
		{Faces: []string{"E", "E", "G", "H", "N", "W"}},
		{Faces: []string{"E", "E", "I", "N", "S", "U"}},
		{Faces: []string{"E", "H", "R", "T", "V", "W"}},
		{Faces: []string{"E", "I", "O", "S", "S", "T"}},
		{Faces: []string{"E", "L", "R", "T", "T", "Y"}},
		{Faces: []string{"H", "I", "M", "N", "U", "Qu"}},
		{Faces: []string{"H", "L", "N", "N", "R", "Z"}},
	},
}
