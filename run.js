import random

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.attack = 10
        self.defense = 5
        self.inventory = ['potion', 'elixir', 'revive', 'ether', 'phoenix down', 'mega potion', 'mega elixir', 'max ether']

    def take_damage(self, damage):
        """Reduce player's health, ensuring it doesn't go negative."""
        self.health -= max(0, damage - self.defense)

    def attack_enemy(self, enemy):
        """Player attacks the enemy."""
        damage = random.randint(1, self.attack)
        enemy.take_damage(damage)
        print(f"{self.name} attacks {enemy.name} for {damage} damage.")

    def use_item(self, item):
        """Use an item from the inventory."""
        if item in self.inventory:
            if item == 'potion':
                self.health += random.randint(10, 20)
                print(f"{self.name} uses a potion and restores health.")
                self.inventory.remove('potion')
            elif item == 'elixir':
                self.health += random.randint(20, 30)
                print(f"{self.name} uses an elixir and restores health.")
                self.inventory.remove('elixir')
            elif item == 'revive':
                if self.health <= 0:
                    self.health = 50
                    print(f"{self.name} uses a revive and restores to 50 health.")
                    self.inventory.remove('revive')
                else:
                    print("You can only use revive when your health is 0.")
            # Add more item effects
        else:
            print("Item not available.")

    def check_inventory(self):
        """Check the player's inventory."""
        print(f"{self.name}'s Inventory:")
        for item in self.inventory:
            print("- " + item)

class Enemy:
    def __init__(self, name):
        self.name = name
        self.health = 50
        self.attack = 8
        self.defense = 2

    def take_damage(self, damage):
        """Reduce the enemy's health."""
        self.health -= damage

    def attack_player(self, player):
        """Enemy attacks the player."""
        damage = random.randint(1, self.attack)
        player.take_damage(damage)
        print(f"{self.name} attacks {player.name} for {damage} damage.")

class GameMap:
    """Class representing the game map."""
    def __init__(self):
        self.map_size = (10, 10)
        self.map_data = [['.' for _ in range(self.map_size[0])] for _ in range(self.map_size[1])]

    def print_map(self):
        """Print the game map."""
        print("Game Map:")
        for row in self.map_data:
            print(' '.join(row))

    def generate_obstacles(self, num_obstacles):
        """Generate obstacles on the map."""
        for _ in range(num_obstacles):
            x = random.randint(0, self.map_size[0] - 1)
            y = random.randint(0, self.map_size[1] - 1)
            self.map_data[y][x] = '#'

def main():
    player_name = input("Enter your name: ")
    player = Player(player_name)
    enemy = Enemy("Dragon")
    game_map = GameMap()
    game_map.generate_obstacles(5)
    game_map.print_map()

    while player.health > 0 and enemy.health > 0:
        action = input("Enter your action (attack/item/check/map): ").lower()
        if action == 'attack':
            player.attack_enemy(enemy)
        elif action == 'item':
            if player.inventory:
                item_to_use = random.choice(player.inventory)
                player.use_item(item_to_use)
            else:
                print("No items left in inventory.")
        elif action == 'check':
            player.check_inventory()
        elif action == 'map':
            game_map.print_map()
        else:
            print("Invalid action.")

        enemy.attack_player(player)

    if player.health <= 0:
        print("Game over. You lost!")
    else:
        print("Congratulations! You defeated the enemy.")

if __name__ == "__main__":
    main()
