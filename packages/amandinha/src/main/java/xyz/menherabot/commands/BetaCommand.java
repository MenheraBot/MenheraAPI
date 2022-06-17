package xyz.menherabot.commands;

import javax.annotation.Nonnull;

import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import xyz.menherabot.Constants;

public class BetaCommand extends ListenerAdapter {
  @Override
  public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
    if(!e.getName().equals("beta")) return;

    Role role = e.getGuild().getRoleById(Constants.BETA_ROLE);

    if(e.getMember().getRoles().contains(role)) {
      e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
      e.reply("Perfeitamente, você perdeu o acesso às atualizações da Beta").queue();
      return;
    }

    e.getGuild().addRoleToMember(e.getUser(), role).queue();
    e.reply("DAliiii. Você agora será notificado das atualizações da beta. Tudo isso acontece no <#852197292589187094>").queue(); 
  }
}
