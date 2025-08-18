package boggle

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

func TestDiceSetString(t *testing.T) {
	tests := map[string]struct {
		diceSet  DiceSet
		expected string
	}{
		"EN Classic Base": {
			diceSet: ENClassicDiceSet,
			expected: `Language: EN
GameType: Classic
A at 0°
A at 0°
A at 0°
A at 0°
A at 0°
A at 0°
A at 0°
B at 0°
D at 0°
D at 0°
E at 0°
E at 0°
E at 0°
E at 0°
E at 0°
G at 0°
`,
		},
		"EN Modern Base": {
			diceSet: ENModernDiceSet,
			expected: `Language: EN
GameType: Modern
A at 0°
A at 0°
A at 0°
A at 0°
A at 0°
C at 0°
D at 0°
D at 0°
D at 0°
E at 0°
E at 0°
E at 0°
E at 0°
E at 0°
H at 0°
H at 0°
`,
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			actual := tc.diceSet.String()
			diff := cmp.Diff(tc.expected, actual)
			if diff != "" {
				t.Fatal(diff)
			}
		})
	}
}

func TestDiceSetRoll(t *testing.T) {
	tests := map[string]struct {
		diceSet       DiceSet
		expectedDeg   int
		expectedError string
	}{
		"EN Classic Roll": {
			diceSet:       ENClassicDiceSet,
			expectedDeg:   360 / 4,
			expectedError: "",
		},
		"EN Modern Roll": {
			diceSet:       ENModernDiceSet,
			expectedDeg:   360 / 4,
			expectedError: "",
		},
	}
	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			err := tc.diceSet.Roll()
			t.Log(tc.diceSet.String())
			if err != nil {
				diffErr := cmp.Diff(tc.expectedError, err.Error())
				t.Fatal(diffErr)
			}
			for _, d := range tc.diceSet.Dice {
				if d.Orientation%tc.expectedDeg != 0 {
					t.Fatalf("%d is not an integer multiple of %d", d.Orientation, tc.expectedDeg)
				}
			}
		})
	}
}
