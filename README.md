# GBS-SetActorInvincibilityFrames
**GB Studio plugin that modifies the engine-defined invincibility frames of actors.**

In GB Studio, the code regarding actor collision has an engine-defined number of invincibility frames. This value is exactly 20 frames across all actors, which can also be described as a third of a second. If you hit two or more actors during this 20-frame period, then only the first actor's collision script will be activated. In some cases, this can cause missed actor collision checks.

*SetActorInvincibilityFrames* allows for the invincibility frames of actors to be dynamically modified and viewed, with both an engine field and two events.

*MinimizeActorInvincibilityFrames* is a minimal version of the plugin that contains no events or engine fields, and simply changes the number of engine-defined invincibility frames from 20 to 4.

## Usage

Disclaimer: Many are familiar with the concept of invincibility frames in many games. For example, after being hit by an enemy in many platformer titles, the game may allow you a few seconds of invulnerability from enemies. **Keep in mind that the engine-defined invincibility frame value will extend to every single actor in the scene, regardless of whether they are enemies or not.**

To use *SetActorInvincibilityFrames*, add the plugin to the `plugins` folder of the GB Studio project. By default, the engine-defined invincibility frame value will be 20. To change this, either modify the "Invincibility Frames" value present in the "Actor Invincibility Frames" group of the Settings menu or use a "Set Actor Invincibility Frames" event. You can also use "Store Actor Invincibility Frames In Variable" to keep track of the current engine-defined invincibility frame value. For best compatibility, make sure no engine plugins in the project modify `src/core/actor.c` or `include/actor.h`.

To use *MinimizeActorInvincibilityFrames*, simply add the plugin to the `plugins` folder of the GB Studio project. By default, the engine-defined invincibility frame value will be 4. For best compatibility, make sure no engine plugins in the project modify `include/actor.h`.

Because the *SetActorInvincibilityFrames* plugin adds an unsigned 8-bit integer (`custom_iframes`), the custom invincibility frame value can be anywhere from 0 frames (0 seconds) to 255 frames (4.25 seconds). Setting the value lower than GB Studio's default 20 may allow for fewer missed collision checks, but may also contribute towards greater in-game lag.

To update this plugin to a newer release, simply merge the contents of the updated plugin with the old plugin. See the [Plugins](https://www.gbstudio.dev/docs/extending-gbstudio/plugins/) page in the GB Studio documentation for further information on using plugins.

## Documentation

*SetActorInvincibilityFrames* erases the definition of `PLAYER_HURT_IFRAMES` and adds a new unsigned 8-bit integer value of `custom_iframes`. The "Set Actor Invincibility Frames" event sets the value of `custom_iframes` to any number between 0 and 255, and the "Store Actor Invincibility Frames In Variable" event stores the value of `custom_iframes` in a variable. The plugin modifies `actor.c` and `actor.h`, which were both modified to include the UBYTE definition of `custom_iframes`. Furthermore, `actor.c` received some changes to the `void actors_handle_player_collision(void) BANKED {` function. Instead of `player_iframes` being set to `PLAYER_HURT_IFRAMES`, it is now set to the value of `custom_iframes`. Additionally, the first "if" statement now runs when `custom_iframes < player_iframes`. This was done to immediately change `player_iframes` if `custom_iframes` was set to a smaller value during a collision check. If `custom_iframes` is set to a larger value during a collision check, it will wait for `player_iframes` to return to 0 before changing its value.

*MinimizeActorInvincibilityFrames* changes the value of `PLAYER_HURT_IFRAMES` in `actor.h` from 20 to 4. Other than a comment, on the aforementioned line, this is the only change done to the engine. It is possible to edit the value of 4 to a higher or lower value, depending on your needs. I found that a value of 4 is a good middle ground between not causing too much lag, and not causing too much missed actor collision checks.

If either plugin is installed on a version that is not `4.2.0-e1`, the GB Studio compiler will return a warning. If you have verified the plugin works on a different version, update the version text within `engine/engine.json` to resolve the warning. At the time of publishing both plugins (GB Studio 4.1.3), [actor.c](https://github.com/chrismaltby/gbvm/commit/dce75851b74584d808187b8628989be0891687fa) was last updated with a commit hash of `dce7585` and [actor.h](https://github.com/chrismaltby/gbvm/commit/33e8e44a02f66744cb19293e4bca22cd7ae45e1b) was last updated with a commit hash of `33e8e44`. If these files were updated, an update may be required for either plugin to work.

To manually update either plugin, try seeing what was modified in the file, and adapting those changes to the plugin's file. If you can update it yourself, a [pull request](https://github.com/KirbyKing186/GBS-SetActorInvincibilityFrames/pulls) would be highly appreciated. Otherwise, you can make an [issue](https://github.com/KirbyKing186/GBS-SetActorInvincibilityFrames/issues) and I will try and update it myself as soon as possible.

## Credits

Developed and maintained by [KirbyKing186](https://github.com/KirbyKing186)
